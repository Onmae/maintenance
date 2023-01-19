import {Fragment, useEffect} from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    UserCircleIcon,
    UserPlusIcon,
    UsersIcon,
} from '@heroicons/react/24/outline'
import Cookies from "js-cookie";
import logo from '../images/logo.png'
import {Link, useNavigate} from "react-router-dom";

const solutions = [
    {
        name: '개인정보',
        description: 'Get a better understanding of where your traffic is coming from.',
        href: `/edituser/${Cookies.get("id")}`,
        icon: UserCircleIcon,
    },
    {
        name: '사용자추가',
        description: 'Get a better understanding of where your traffic is coming from.',
        href: '/adduser',
        icon: UserPlusIcon,
    },
    {
        name: '회원관리',
        description: 'Speak directly to your customers in a more meaningful way.',
        href: '/users',
        icon: UsersIcon,
    },
]

export const Header = () => {
    const navigate = useNavigate();

    const logoutEvent = () => {
        Cookies.remove('id')
        Cookies.remove('name')
        Cookies.remove('role')
        navigate('/')
    }

    useEffect(() => {
        if (!Cookies.get("id")) {
            navigate("/");
        }
    }, []);

    return (
        <Popover className="relative bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <Link to="/main">
                            <span className="sr-only">SecretCode</span>
                            <img
                                className="h-16 w-auto sm:h-20"
                                src={logo}
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="-my-2 -mr-2 md:hidden">
                        <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                    </div>
                    <Popover.Group as="nav" className="hidden space-x-10 md:flex">

                        <Link to="/adduser" className="text-base font-medium text-gray-500 hover:text-gray-900 whitespace-nowrap">
                            사용자 추가
                        </Link>
                        <Link to="/users" className="text-base font-medium text-gray-500 hover:text-gray-900 whitespace-nowrap">
                            회원관리
                        </Link>

                    </Popover.Group>
                    <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                        <Link to={solutions[0].href} className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                            {Cookies.get('id')} 님
                        </Link>
                        <span
                            onClick={logoutEvent}
                            className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gray-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                            로그아웃
                        </span>
                    </div>
                </div>
            </div>

            <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel focus className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden z-50">
                    <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="px-5 pt-5 pb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <img
                                        className="h-8 w-auto"
                                        src={logo}
                                        alt="Your Company"
                                    />
                                </div>
                                <div className="-mr-2">
                                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">Close menu</span>
                                        {/*<XMarkIcon className="h-6 w-6" aria-hidden="true" />*/}
                                    </Popover.Button>
                                </div>
                            </div>
                            <div className="mt-6">
                                <nav className="grid gap-y-8">
                                    {solutions.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                                        >
                                            <item.icon className="h-6 w-6 flex-shrink-0 text-indigo-600" aria-hidden="true" />
                                            <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </div>
                        <div className="space-y-6 py-6 px-5">

                            <div>
                                <a
                                    onClick={logoutEvent}
                                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                >
                                    로그아웃
                                </a>
                            </div>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}

export default Header