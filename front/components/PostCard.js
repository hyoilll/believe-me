import { Avatar, Card, Comment, List } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import CommentForm from "./CommentForm";
import { useSelector } from "react-redux";

const PostCard = ({ post }) => {
  const { me } = useSelector((state) => state.user);

  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  return (
    <div style={{ marginTop: "30px" }}>
      <Card
        actions={[
          <MessageOutlined
            key="comment"
            onClick={onToggleComment}
          ></MessageOutlined>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={post.content}
        ></Card.Meta>
      </Card>
      {commentFormOpened && (
        <div>
          {me && <CommentForm post={post}></CommentForm>}
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => {
              return (
                <li>
                  <Comment
                    author={item.User.nickname}
                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                    content={item.content}
                  ></Comment>
                </li>
              );
            }}
          ></List>
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    User: PropTypes.object,
    content: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default PostCard;
