import { cookies } from "next/headers";
import UserBar from "./userBar";

export default function UserBarServer(props) {

	return (
		<UserBar user={cookies().get('current-user')} />
	);

}