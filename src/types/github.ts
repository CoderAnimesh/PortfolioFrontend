export interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null; // ✅ MUST allow null
}
