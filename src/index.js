const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const cr = (el, className = "", text = "") => {
    const $el = document.createElement(el);
    $el.className = className;
    $el.textContent = text;
    return $el;
};
class ForComparison {
    constructor(item) {
        this.item = item;
        this.asString = "";
        this.asString = `${item}`;
        if (typeof item === "string") {
            this.asString = `"${item}"`;
        }
        else if (Array.isArray(this.item)) {
            this.asString = JSON.stringify(this.item);
        }
        else if (this.item instanceof Object) {
            this.asString = "{}";
        }
    }
    testResults(fc2, comparator = "===") {
        const evalStr = "" + this.asString + comparator + fc2.asString;
        return [evalStr, eval("(" + evalStr + ")")];
    }
    toString() {
        return this.asString;
    }
}
class ComparisonTable {
    constructor(node) {
        this.node = node;
        const values = window[this.node.dataset.componentSetup];
        if (!values)
            return;
        const comps = values.map((v) => new ForComparison(v));
        const $table = cr("table", "table");
        const $headRow = cr("tr", "header");
        $headRow.appendChild(document.createElement("td"));
        $table.appendChild($headRow);
        for (let comp of comps) {
            const $el = cr("span", "rotate", comp.asString);
            const $td = cr("td", "term-vertical");
            $td.appendChild($el);
            $headRow.appendChild($td);
        }
        for (let compX of comps) {
            const $tr = cr("tr", "row");
            const $td = cr("td", "term", compX.asString);
            $tr.appendChild($td);
            for (let compY of comps) {
                const [evalStr1, r1] = compX.testResults(compY, "===");
                const [evalStr2, r2] = compX.testResults(compY, "==");
                let className = "";
                let status = "";
                let txt = "";
                if (r1 && r2) {
                    status = "strictly equal";
                    className = "bg-green bg-no-invert";
                    txt = "=";
                }
                else if (r2) {
                    status = "loosely equal";
                    className = "bg-red bg-no-invert";
                    txt = "&#8773;";
                }
                else {
                    status = "not equal";
                    className = "bg-blue";
                    txt = "&#8800;";
                }
                const $td = cr("td", `equality ${className}`);
                $td.innerHTML = `<div class="equality-item"><code class="equality-text">${txt}</code></div>`;
                $td.setAttribute("data-title", `${compX} ${status} ${compY}`);
                $tr.appendChild($td);
            }
            $table.appendChild($tr);
        }
        this.node.appendChild($table);
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
