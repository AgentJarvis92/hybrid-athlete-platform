import { RelationshipStatus } from './enums';

export interface CoachAthleteRelationship {
  id: string;
  coach_id: string;
  athlete_id: string | null;
  status: RelationshipStatus;
  invite_code: string;
  created_at: string;
  updated_at: string;
}

export interface CoachAthleteRelationshipInsert {
  coach_id: string;
  athlete_id?: string | null;
  status?: RelationshipStatus;
}

export interface CoachAthleteRelationshipUpdate {
  athlete_id?: string | null;
  status?: RelationshipStatus;
}
