import { useState } from 'react'
import { Link } from "react-router-dom"
import { TeamOutlined, HomeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
const items: MenuProps['items'] = [
    {
        label: <Link to="/">Home</Link>,
        key: 'home',
        icon: <HomeOutlined />,
    },
    {
        label: <Link to="/users">Users</Link>,
        key: 'users',
        icon: <TeamOutlined />,
    }
];
const Header = () => {
    const [current, setCurrent] = useState('home');

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default Header