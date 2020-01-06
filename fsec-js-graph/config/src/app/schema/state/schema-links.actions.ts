export class TraitsLaidOutAction {
    static readonly type = '[SchemaLinks] Schema Traits Laid Out';
    constructor(public layout: { trait: string, fields: { field: string, rect: DOMRect }[] }) {}
}
