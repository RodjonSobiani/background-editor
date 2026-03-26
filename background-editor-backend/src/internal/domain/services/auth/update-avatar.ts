import {updateAvatarUser,} from "../../repository/user";

export async function updateAvatarUserService(userData: {
    userId: string;
    avatar: string | null;
}) {
    const {userId, avatar} = userData;

    await updateAvatarUser(userId, avatar);
}
