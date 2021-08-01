"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtifactSchema = void 0;
const mongoose = require("mongoose");
exports.ArtifactSchema = new mongoose.Schema({
    id: { type: Number },
    description: { type: String },
    progress: { type: Number },
    budget: { type: String },
    achievement: { type: String },
    work: { type: String },
});
//# sourceMappingURL=artifact.schema.js.map