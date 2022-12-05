export class ManagerListings {
  private song_id: string;
  private file_name: string;
  private song_status: number;
  private attributes: Array<string> | string | null;

  constructor(song_id: string, f_name: string, status: number, attr: Array<string> | string | null) {
    this.song_id = song_id;
    this.file_name = f_name;
    this.song_status = status;
    this.attributes = attr
  }


  getSongId(): string {
    return this.song_id
  }

  getSongFileName(): string {
    return this.file_name;
  }

  getSongAttributes(): Array<string> | string {
    if (this.attributes == null) {
      return "[]"
    }
    if (this.attributes.length == 0) {
      return "[]"
    }
    return this.attributes
  }

  // TODO: fix the enum based selection
  getSongStatus(): string {
    if (this.song_status == 1) {
      return "UPLOADED"
    }
    else {
      return "TBD"
    }
  }
}
