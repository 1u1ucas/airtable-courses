import { createClient } from "@/prismicio";
import { notFound } from "next/navigation";

const ArticlePage = async ({
    params,
}: {
    params: {
        uid: string;
    };
}) => {
    const { uid } = params;
    const client = createClient();
    const article = await client.getByUID("articles", uid);

    if (!article) {
       notFound();
    }

    return (
        <div>
            <h1>Article Page</h1>
        </div>
    );
};