import { RouteProps } from 'react-router-dom';

import { ChatScreen } from '../modules/ChatModule';
import { ContactScreen } from '../modules/ContactsModule';
import ExtraPage from './extra';

import ChatIcon from '@material-ui/icons/Chat';
import ContactsIcon from '@material-ui/icons/Contacts';
import EmojiSymbolsIcon from '@material-ui/icons/EmojiSymbols';


const Routes: RouteProps[] = [
    { path: '/home/chat', component: ChatScreen },
    { path: '/home/contact', component: ContactScreen },
    { path: '/home/extra', component: ExtraPage }
];

const Navigators: any[] = [
    { url: '/home/chat', icon: ChatIcon },
    { url: '/home/contact', icon: ContactsIcon },
    { url: '/home/extra', icon: EmojiSymbolsIcon }
]

export { Routes, Navigators };