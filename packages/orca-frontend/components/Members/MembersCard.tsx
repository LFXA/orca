import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Root, ImageContainer, Image, InitialLetters, FullName, UserName } from './style';
import { Link, Spacing } from '../ui';
import Follow from '../Follow';
import theme from '../../theme';
import { RootState } from '../../store';

interface MembersCardProps {
  user: any;
  queryKey: any;
}

const MembersCard: FC<MembersCardProps> = ({ user, queryKey }) => {
  const [color, setColor] = useState('');
  const authUser = useSelector((state: RootState) => state.auth.user);

  const { fullName, username, pokeApiId } = user;

  useEffect(() => {
    const { primary, secondary, success, error } = theme.colors.general;
    const colors = [primary, secondary, success, error];
    const randomColor = Math.floor(Math.random() * colors.length);
    setColor(colors[randomColor]);
  }, []);

  const splitFullName = () => {
    const splitWords = fullName.split(' ').slice(0, 2).join(' ');
    const firstLetters = splitWords
      .split(' ')
      .map((a) => a.charAt(0))
      .join(' ');

    return firstLetters;
  };

  return (
    <Root>
      <Link href={`/profile/${user._id}`} disableBorderOnHover>
        <ImageContainer>
          {pokeApiId ? (
            <Image alt={user.fullName} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeApiId}.png`} />
          ) : (
            <InitialLetters color={color}>{splitFullName()}</InitialLetters>
          )}
        </ImageContainer>
      </Link>

      <Spacing top="sm" bottom="xs">
        <Link href={`/profile/${user._id}`} disableBorderOnHover weight="bold" color="textSecondary">
          <FullName>{fullName}</FullName>
        </Link>
      </Spacing>

      {username ? <UserName>@{username}</UserName> : <Spacing top="sm" />}

      {authUser && (
        <Spacing top="md">
          <Follow queryKey={queryKey} user={user} />
        </Spacing>
      )}
    </Root>
  );
};
export default MembersCard;
