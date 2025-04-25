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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeilisearchServices = void 0;
const meilisearch_1 = require("../../utils/meilisearch");
const getAllItems = (limit, searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const index = meilisearch_1.meiliClient === null || meilisearch_1.meiliClient === void 0 ? void 0 : meilisearch_1.meiliClient.index('product');
    if (!index) {
        throw new Error('MeiliSearch client or index not found');
    }
    const searchString = searchTerm || '';
    try {
        const result = yield index.search(searchString, { limit });
        return result;
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error searching MeiliSearch:', error);
        throw error;
    }
});
exports.MeilisearchServices = {
    getAllItems,
};
