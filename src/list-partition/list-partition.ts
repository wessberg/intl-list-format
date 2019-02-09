export interface ElementPartition {
	type: "element";
	value: ListPartition[] | string;
}

export interface ListPartitionBase {
	value: string;
}

export interface LiteralPartition extends ListPartitionBase {
	type: "literal";
}

export type ListPartition = ElementPartition | LiteralPartition;

export type ListPartitions = ReadonlyArray<ListPartition>;
