import { useDisclosure } from '@mantine/hooks';
import { HeaderButtonsProps } from '.';
import { useEffect } from 'react';
import { Drawer } from '@mantine/core';
import logo from '../../assets/ico_logo.svg';
import menu from '../../assets/ico_gnb_menu.svg';

export default function HeaderLeft({ pathNow, navigate }: HeaderButtonsProps) {
  const [opened, { open: drawerOpen, close: drawerClose }] = useDisclosure(false);
  useEffect(() => {
    drawerClose();
  }, [drawerClose, pathNow]);

  const MenuItems: { name: string; path: string }[] = [
    { name: '피드', path: 'board' },
    { name: '검색', path: 'search' },
  ];

  if (['/', '/login', '/signup'].includes(pathNow)) return null;

  return (
    <>
      <Drawer opened={opened} onClose={drawerClose} radius='md' padding='md' size='220px'>
        <ul className='flex flex-col'>
          {MenuItems.map((menu, index) => (
            <li className='cursor-pointer p-[24px_20px] text-lg' key={index} onClick={() => navigate(menu.path)}>
              {menu.name}
            </li>
          ))}
        </ul>
      </Drawer>

      <ul className='flex items-center gap-[12px] tablet:gap-[24px] desktop:gap-[36px] mr-auto cursor-pointer'>
        <li onClick={() => navigate('/epigrams')} className='w-[101px] desktop:w-[131px] h-[24px] tablet:h-[26px] desktop:h-[36px]'>
          <button className='mr-[12px] w-full h-full'>
            <img src={logo} alt='메인 페이지로' />
          </button>
        </li>
        <li>
          <ul className='hidden tablet:flex gap-[24px] items-center mt-[3px]'>
            {MenuItems.map((menu, index) => (
              <li className='tablet:text-[14px] desktop:text-[16px] tablet:leading-[24px] desktop:leading-[26px]' key={index} onClick={() => navigate(menu.path)}>
                <button>{menu.name}</button>
              </li>
            ))}
          </ul>
        </li>
        <li className='inline h-[24px] tablet:hidden order-first cursor-pointer'>
          <button onClick={drawerOpen}>
            <img src={menu} alt='더보기메뉴' />
          </button>
        </li>
      </ul>
    </>
  );
}
