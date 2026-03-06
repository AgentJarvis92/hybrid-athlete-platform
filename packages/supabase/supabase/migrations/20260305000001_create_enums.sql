-- Phase 1: Create custom enums for the platform

-- User roles
CREATE TYPE public.user_role AS ENUM ('athlete', 'coach');

-- Module types available in the platform
CREATE TYPE public.module_type AS ENUM ('running', 'strength', 'nutrition');

-- Coach-athlete relationship status
CREATE TYPE public.relationship_status AS ENUM ('pending', 'active', 'revoked');
