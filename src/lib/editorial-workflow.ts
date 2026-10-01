// Contracts only. No automatic publication or unprotected write endpoints.
export type EditorialState = 'draft' | 'in_review' | 'approved' | 'published';
export interface EditorialDraft { id:string; title:string; sourceUrls:string[]; state:EditorialState; reviewerId?:string; reviewedAt?:string; disclosure:'editorial'|'sponsored'|'affiliate'; }
export interface AutomationJob { id:string; kind:'source_ingestion'|'deduplication'|'social_package'; draftId:string; state:'queued'|'running'|'needs_review'|'failed'; }
export interface SocialPackage { articleId:string; caption:string; formats:('feed-4:5'|'story-9:16'|'link-post')[]; approvedBy?:string; }
