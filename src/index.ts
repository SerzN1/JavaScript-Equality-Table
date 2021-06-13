const TABLE_VALUES = window["TABLE_VALUES"];

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const cr = (el: string, className = "", text = ""): HTMLElement => {
  const $el = document.createElement(el);
  $el.className = className;
  $el.textContent = text;
  return $el;
};

interface IComparator<T> {
  testResults(comp: any): [string, T];
}

type EqualityStatus = "strictly equal" | "loosely equal" | "not equal";
class EqualityComparison implements IComparator<EqualityStatus> {
  public asString: string = "";

  constructor(private item) {
    this.asString = `${item}`;

    if (typeof item === "string") {
      this.asString = `"${item}"`;
    } else if (Array.isArray(this.item)) {
      this.asString = JSON.stringify(this.item);
    } else if (this.item instanceof Object) {
      this.asString = "{}";
    }
  }

  testResults(fc2: any): [string, EqualityStatus] {
    const evalStrict = "" + this.asString + "===" + fc2.asString;
    const evalLoose = "" + this.asString + "==" + fc2.asString;
    const r1 = (0, eval)("(" + evalStrict + ")");
    const r2 = (0, eval)("(" + evalLoose + ")");

    let compStatus: EqualityStatus = "not equal";

    if (r1 && r2) {
      compStatus = "strictly equal";
    } else if (r2) {
      compStatus = "loosely equal";
    }

    return [`${this.asString} ${compStatus} ${fc2}`, compStatus];
  }

  toString() {
    return this.asString;
  }
}

class IfComparison implements IComparator<boolean> {
  public asString = "if (x)";

  testResults(comp: any): [string, boolean] {
    const evalStr = `${comp} ? true : false`;
    const res = (0, eval)("(" + evalStr + ")");
    return [`if (${comp}) is ${res}`, res];
  }
}

class ComparisonTable {
  constructor(private node: HTMLElement) {
    if (!TABLE_VALUES) return;

    const ifComp = new IfComparison();
    const comps = TABLE_VALUES.map((v) => new EqualityComparison(v));
    const $table = cr("table", "table");

    // Table header
    const $headRow = cr("tr", "header");
    $headRow.appendChild(document.createElement("td"));
    $table.appendChild($headRow);

    $headRow.appendChild(this.createTableHeaderCell(ifComp.asString));
    for (let comp of comps) {
      $headRow.appendChild(this.createTableHeaderCell(comp.asString));
    }

    // Table content
    for (let compX of comps) {
      const $tr = cr("tr", "row");
      const $td = cr("td", "term", compX.asString);
      $tr.appendChild($td);

      const [ifString, ifRes] = ifComp.testResults(compX);
      const ifClassName = `bg-yellow ${ifRes ? "bg-no-invert" : ""}`;

      $tr.appendChild(
        this.createTableCell(ifClassName, ifRes ? "✔️" : "-", ifString)
      );

      const txtByCompStatus: Record<EqualityStatus, string> = {
        "strictly equal": "=",
        "loosely equal": "&#8773;",
        "not equal": "&#8800;",
      };

      const classNameByCompStatus: Record<EqualityStatus, string> = {
        "strictly equal": "bg-green bg-no-invert",
        "loosely equal": "bg-red bg-no-invert",
        "not equal": "bg-blue",
      };

      for (let compY of comps) {
        const [compString, compStatus] = compX.testResults(compY);

        $tr.appendChild(
          this.createTableCell(
            classNameByCompStatus[compStatus],
            txtByCompStatus[compStatus],
            compString
          )
        );
      }

      $table.appendChild($tr);
    }

    this.node.appendChild($table);
  }

  createTableHeaderCell(textContent: string) {
    const $el = cr("span", "rotate", textContent);
    const $td = cr("td", "term-vertical");
    $td.appendChild($el);
    return $td;
  }
  createTableCell(className: string, textContent: string, title: string) {
    const $td = cr("td", `equality ${className}`);
    $td.innerHTML = `<code class="equality-item">${textContent}</code>`;
    $td.setAttribute("data-title", title);
    return $td;
  }
}

const componentsMap = {
  ComparisonTable,
};

$$("[data-component]").forEach((node) => {
  const Component = componentsMap[node.dataset.component];
  if (Component) {
    new Component(node);
  }
});
