import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card"

import { Post } from '@prisma/client';

type PostCardProps = {
    post: Post;
};

const PostCard = ({ post }: PostCardProps) => {
    return (
        <Card className="max-w-3xl my-4">
            <CardHeader className="text-lg font-semibold">
                {post.title}
            </CardHeader>
            <CardContent className="text-base">
                {post.content}
            </CardContent>
            <CardFooter className="text-sm">
                Posted by: {post.professorName}
            </CardFooter>
        </Card>
    );
};

export default PostCard;

