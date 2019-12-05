import conversationActions from './actions/conversation';
import messageActions from './actions/message';
import ChatReducer from './reducer';
import { Conversation, Message } from './interface';
import ChatScreen from './pages/chat';
export { ChatScreen, conversationActions, messageActions, ChatReducer };

export type Conversation = Conversation;
export type Message = Message;