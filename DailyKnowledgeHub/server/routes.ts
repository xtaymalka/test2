import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTopicSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all topics
  app.get("/api/topics", async (req, res) => {
    try {
      const topics = await storage.getAllTopics();
      res.json(topics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch topics" });
    }
  });

  // Get daily topic (must come before /:id route)
  app.get("/api/topics/daily", async (req, res) => {
    try {
      const topic = await storage.getDailyTopic();
      if (!topic) {
        return res.status(404).json({ error: "No daily topic found" });
      }
      res.json(topic);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch daily topic" });
    }
  });

  // Get popular topics (must come before /:id route)
  app.get("/api/topics/popular", async (req, res) => {
    try {
      const topics = await storage.getPopularTopics();
      res.json(topics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch popular topics" });
    }
  });

  // Get topics by category (must come before /:id route)
  app.get("/api/topics/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const topics = await storage.getTopicsByCategory(category);
      res.json(topics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch topics by category" });
    }
  });

  // Get topics by age group (must come before /:id route)
  app.get("/api/topics/age/:ageGroup", async (req, res) => {
    try {
      const { ageGroup } = req.params;
      const topics = await storage.getTopicsByAgeGroup(ageGroup);
      res.json(topics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch topics by age group" });
    }
  });

  // Get topic by ID (must come after specific routes)
  app.get("/api/topics/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid topic ID" });
      }
      
      const topic = await storage.getTopic(id);
      if (!topic) {
        return res.status(404).json({ error: "Topic not found" });
      }
      
      res.json(topic);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch topic" });
    }
  });

  // Search topics
  app.get("/api/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ error: "Search query is required" });
      }
      
      const topics = await storage.searchTopics(q);
      res.json(topics);
    } catch (error) {
      res.status(500).json({ error: "Failed to search topics" });
    }
  });

  // Create new topic (for admin use)
  app.post("/api/topics", async (req, res) => {
    try {
      const validatedData = insertTopicSchema.parse(req.body);
      const topic = await storage.createTopic(validatedData);
      res.status(201).json(topic);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid topic data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create topic" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
