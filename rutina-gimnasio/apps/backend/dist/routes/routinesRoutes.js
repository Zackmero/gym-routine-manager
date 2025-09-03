"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routinesController_1 = require("../controllers/routinesController");
const authenticateToken_1 = require("../middleware/authenticateToken");
const router = (0, express_1.Router)();
//* Get routines
router.get("/", authenticateToken_1.authenticationToken, routinesController_1.getRoutines);
//* Create routine
router.post("/", authenticateToken_1.authenticationToken, routinesController_1.createRoutine);
//* Update Routine
router.put("/:id", authenticateToken_1.authenticationToken, routinesController_1.updateRoutine);
//* Delete Routine
router.delete("/:id", authenticateToken_1.authenticationToken, routinesController_1.deleteRoutine);
exports.default = router;
