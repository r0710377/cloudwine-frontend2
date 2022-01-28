export interface OtaUpdate {
  id: number;
  bin_file_path: string;
  name: string | null;
  deploy_on: string;
}
