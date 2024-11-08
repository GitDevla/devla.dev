export default function JsonLD({ json }: { json: any }) {
    return (
        <script
            type={"application/ld+json"}
            dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
        />
    );
}