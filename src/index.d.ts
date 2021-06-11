declare const $: any;
declare const $$: any;
declare const cr: (el: string, className?: string, text?: string) => HTMLElement;
declare class ForComparison {
    private item;
    asString: string;
    constructor(item: any);
    testResults(fc2: any, comparator?: string): [string, any];
    toString(): string;
}
declare class ComparisonTable {
    private node;
    constructor(node: HTMLElement);
}
declare const componentsMap: {
    ComparisonTable: typeof ComparisonTable;
};
