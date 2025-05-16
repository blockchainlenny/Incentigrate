import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name"),
  walletAddress: text("wallet_address"),
  tokenBalance: integer("token_balance").default(0),
  email: text("email"),
  avatar: text("avatar"),
  createdAt: text("created_at"),
});

// Learning progress table
export const learningProgress = pgTable("learning_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  moduleId: text("module_id").notNull(),
  completedLessons: integer("completed_lessons").default(0),
  totalLessons: integer("total_lessons").notNull(),
  earnedXp: integer("earned_xp").default(0),
  tokensClaimed: boolean("tokens_claimed").default(false),
  lastUpdated: text("last_updated"),
});

// Integration steps progress table
export const integrationProgress = pgTable("integration_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  stepId: text("step_id").notNull(),
  completed: boolean("completed").default(false),
  subTasksProgress: jsonb("subtasks_progress").default([]),
  tokensClaimed: boolean("tokens_claimed").default(false),
  completedDate: text("completed_date"),
});

// Forum posts table
export const forumPosts = pgTable("forum_posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  tags: text("tags").array().default([]),
  createdAt: text("created_at"),
  updatedAt: text("updated_at"),
});

// Forum replies table
export const forumReplies = pgTable("forum_replies", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull().references(() => forumPosts.id),
  userId: integer("user_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  createdAt: text("created_at"),
  updatedAt: text("updated_at"),
});

// Create insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true,
  walletAddress: true,
  email: true,
  avatar: true,
});

export const insertLearningProgressSchema = createInsertSchema(learningProgress).pick({
  userId: true,
  moduleId: true,
  completedLessons: true,
  totalLessons: true,
  earnedXp: true,
});

export const insertIntegrationProgressSchema = createInsertSchema(integrationProgress).pick({
  userId: true,
  stepId: true,
  completed: true,
  subTasksProgress: true,
});

export const insertForumPostSchema = createInsertSchema(forumPosts).pick({
  userId: true,
  title: true,
  content: true,
  category: true,
  tags: true,
});

export const insertForumReplySchema = createInsertSchema(forumReplies).pick({
  postId: true,
  userId: true,
  content: true,
});

// Define types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertLearningProgress = z.infer<typeof insertLearningProgressSchema>;
export type LearningProgress = typeof learningProgress.$inferSelect;

export type InsertIntegrationProgress = z.infer<typeof insertIntegrationProgressSchema>;
export type IntegrationProgress = typeof integrationProgress.$inferSelect;

export type InsertForumPost = z.infer<typeof insertForumPostSchema>;
export type ForumPost = typeof forumPosts.$inferSelect;

export type InsertForumReply = z.infer<typeof insertForumReplySchema>;
export type ForumReply = typeof forumReplies.$inferSelect;
