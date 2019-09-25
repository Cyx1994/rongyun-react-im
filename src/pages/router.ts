import { RouteProps } from 'react-router-dom';
import ChatIcon from '@material-ui/icons/Chat';
import ContactsIcon from '@material-ui/icons/Contacts';
import EmojiSymbolsIcon from '@material-ui/icons/EmojiSymbols';

import ChatPage from './chat';
import ContactPage from './contact';
import ExtraPage from './extra';

const Routes: RouteProps[] = [
    { path: '/home/chat', component: ChatPage },
    { path: '/home/contact', component: ContactPage },
    { path: '/home/extra', component: ExtraPage }
];

const Navigators: any[] = [
    { url: '/home/chat', icon: ChatIcon },
    { url: '/home/contact', icon: ContactsIcon },
    { url: '/home/extra', icon: EmojiSymbolsIcon }
]

export { Routes, Navigators };