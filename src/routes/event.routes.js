import { Router } from "express";
import { getEventById,createEvent,getAnEventByRecency,deleteEvent,updateEvent} from "../controllers/event.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router()

router
.route("/events")
.get(getEventById)
.post(upload.single("files"),createEvent)
router
.route("/events/all")
.get(getAnEventByRecency)

router.route("/events")
.delete(deleteEvent)
.put(upload.single("files"),updateEvent)


export default router