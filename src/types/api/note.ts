export interface Tag {
    id: number;
    name: string;
}

export interface Note {
    id: number;
    title: string;
    createdDate: string;
    tags: Tag[];
}

export interface FullNote extends Note {
    content: string;
    lastModifiedDate: string;
    isPublic: boolean;
}
