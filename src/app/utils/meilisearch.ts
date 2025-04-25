import MeiliSearch from "meilisearch";
import config from "../../config";

// Initialize the MeiliSearch client
export const meiliClient = new MeiliSearch({
    host: config.meilisearch_host as string,
    apiKey: config.meilisearch_master_key,
});

// Function to add a document to MeiliSearch
export async function addDocumentToIndex<T extends { id: number | string; name: string; brand: string; description: string; buyingPrice: Number; sellingPrice: Number; productImages?: string[] }>(
    result: T, // Generic parameter with expected fields
    indexKey: string // MeiliSearch index key
) {
    try {
        const index = meiliClient.index(indexKey);

        // Ensure the index exists or create it
        try {
            await index.getRawInfo();
        } catch {
            console.log(`Index "${indexKey}" not found. Creating it...`);
            await meiliClient.createIndex(indexKey, { primaryKey: "id" });
        }

        // Validate the required fields
        const { id, name, brand, description, buyingPrice, sellingPrice, productImages } = result;
        if (!id || !name || !brand || !description || !buyingPrice || !sellingPrice) {
            console.error("Missing required fields in the result object:", result);
            return;
        }

        // Ensure there's a valid image or fallback to a placeholder
        const firstImage = productImages?.[0] || "https://via.placeholder.com/150";

        // Prepare the document
        const document = {
            id: id.toString(),
            name,
            brand,
            description,
            buyingPrice,
            sellingPrice,
            thumbnail: firstImage,
        };

        // Add the document to MeiliSearch
        const response = await index.addDocuments([document]);
        console.log(`Document with ID ${id} added to MeiliSearch successfully:`, response);
    } catch (error) {
        console.error("Error adding document to MeiliSearch:", error);
    }
}
