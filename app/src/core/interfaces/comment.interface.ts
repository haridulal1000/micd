export interface ICommentThreadDetails {
	case_id: number;
	image_id: number;
	x_coordinate?: number;
	y_coordinate?: number;
	text: string;
}

interface IComment {
	id: number;
	user: {
		first_name: string;
		last_name: string;
		avatar: {
			avatar_url: string;
			type: string;
		} | null;
	};
	text: string;
	updated_at: string;
}

export interface ICommentThread {
	id: number;
	case_id: number;
	image_id: number;
	pinned: boolean;
	x_coordinate: number;
	y_coordinate: number;
	resolved: boolean;
	created_at: string;
	comments: IComment[];
}
