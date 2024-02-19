import ConversationItem from "./ConversationItem";

const ConversationList = () => {
  return (
    <div className="py-2 flex flex-col overflow-auto no-scrollbar">
      <ConversationItem />
      <ConversationItem />
      <ConversationItem />
      <ConversationItem />
      <ConversationItem />
      <ConversationItem />
    </div>
  );
};
export default ConversationList;
