interface IMarkdown {
    metadata: {
        slug: string;
        title: string;
        subtitle: string;
        coverImage: string | null;
        type: string;
        date: string | null;
        fromdate: string | null;
        todate: string | null;
        tags: string[];
        tryLink: string | null;
        sourceLink: string | null;
        lastUpdated: Date;
        created: Date;
        visible: boolean;
    }
    content: string;
};
