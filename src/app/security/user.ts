import { Organisation } from "src/app/super-admin/organisations/organisation";

export interface User {
  id: number;
  organisation_id?: number;
  first_name: string;
  surname: string;
  email: string;
  gsm: string;
  password: string;
  is_active: boolean;
  is_admin: boolean;
  is_superadmin: boolean;
  can_message: boolean;
  can_receive_notification: boolean;
  organisation: Organisation | null;
  token: string;
}
