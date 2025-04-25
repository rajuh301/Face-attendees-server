"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.meiliClient = void 0;
exports.addDocumentToIndex = addDocumentToIndex;
const meilisearch_1 = __importDefault(require("meilisearch"));
const config_1 = __importDefault(require("../../config"));
// Initialize the MeiliSearch client
exports.meiliClient = new meilisearch_1.default({
    host: config_1.default.meilisearch_host,
    apiKey: config_1.default.meilisearch_master_key,
});
// Function to add a document to MeiliSearch
function addDocumentToIndex(result, // Generic parameter with expected fields
indexKey // MeiliSearch index key
) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const index = exports.meiliClient.index(indexKey);
            // Ensure the index exists or create it
            try {
                yield index.getRawInfo();
            }
            catch (_a) {
                console.log(`Index "${indexKey}" not found. Creating it...`);
                yield exports.meiliClient.createIndex(indexKey, { primaryKey: "id" });
            }
            // Validate the required fields
            const { id, name, brand, description, buyingPrice, sellingPrice, productImages } = result;
            if (!id || !name || !brand || !description || !buyingPrice || !sellingPrice) {
                console.error("Missing required fields in the result object:", result);
                return;
            }
            // Ensure there's a valid image or fallback to a placeholder
            const firstImage = (productImages === null || productImages === void 0 ? void 0 : productImages[0]) || "https://via.placeholder.com/150";
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
            const response = yield index.addDocuments([document]);
            console.log(`Document with ID ${id} added to MeiliSearch successfully:`, response);
        }
        catch (error) {
            console.error("Error adding document to MeiliSearch:", error);
        }
    });
}
