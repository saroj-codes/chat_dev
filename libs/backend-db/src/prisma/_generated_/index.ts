import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const UserScalarFieldEnumSchema = z.enum(['id','user_name','email','password','created_at','updated_at']);

export const ChannelScalarFieldEnumSchema = z.enum(['id','creator','name','isPublic','max_number_of_participants','created_at','updated_at']);

export const MessageScalarFieldEnumSchema = z.enum(['id','channel_id','content','sender_id','created_at','updated_at']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  user_name: z.string().min(2, { message: "must be at least 2 characters" }).max(256, { message: "must be at most 256 characters" }).trim(),
  email: z.string().email().min(2, { message: "must be at least 2 characters" }).max(256, { message: "must be at most 256 characters" }).trim(),
  password: z.string().min(2, { message: "must be at least 2 characters" }).max(10, { message: "must be at most 10 characters" }).trim(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// CHANNEL SCHEMA
/////////////////////////////////////////

export const ChannelSchema = z.object({
  id: z.string(),
  creator: z.string(),
  name: z.string().min(2, { message: "must be at least 2 characters" }).max(256, { message: "must be at most 256 characters" }).trim(),
  isPublic: z.boolean(),
  max_number_of_participants: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type Channel = z.infer<typeof ChannelSchema>

/////////////////////////////////////////
// MESSAGE SCHEMA
/////////////////////////////////////////

export const MessageSchema = z.object({
  id: z.string(),
  channel_id: z.string(),
  content: z.string().min(2, { message: "must be at least 2 characters" }).max(256, { message: "must be at most 256 characters" }).trim(),
  sender_id: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type Message = z.infer<typeof MessageSchema>

/////////////////////////////////////////
// MONGODB TYPES
/////////////////////////////////////////
