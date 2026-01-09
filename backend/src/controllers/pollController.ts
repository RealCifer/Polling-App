import { Request, Response } from "express";
import Poll from "../models/Poll";

export const getPollHistory = async (req: Request, res: Response) => {
  try {
    const polls = await Poll.find({ isActive: false })
      .sort({ createdAt: -1 });

    res.status(200).json(polls);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch poll history" });
  }
};
