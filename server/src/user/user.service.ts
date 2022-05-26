import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketService } from 'src/basket/basket.service';
import { User } from 'src/entities/user';
import { FavoriteService } from 'src/favorite/favorite.service';
import { Repository } from 'typeorm';
import { createUserWithImageDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private favoriteService: FavoriteService,
    private basketService: BasketService,
  ) {}

  findById(id: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.basket', 'basket')
      .leftJoinAndSelect('user.favorite', 'favorite')
      .where('user.id = :id', { id })
      .select(['user', 'basket.id', 'favorite.id'])
      .getOne();
  }

  findByLogin(login: string) {
    return this.userRepository.findOne({ where: { login } });
  }

  async createUser(userDto: createUserWithImageDto) {
    const currentUser = this.userRepository.create(userDto);
    const favorite = await this.favoriteService.createFavorite();
    const basket = await this.basketService.createBasket();

    basket.user = currentUser;
    basket.basketToProducts = [];
    favorite.user = currentUser;

    currentUser.favorite = favorite;
    currentUser.basket = basket;

    return this.userRepository.save(currentUser);
  }

  findAllUsers() {
    return this.userRepository.find();
  }

  async updateUser(id: string, updateUserDto: updateUserDto) {
    await this.userRepository.update(Number(id), { ...updateUserDto });
    return this.findById(id);
  }

  deleteUser(id: string) {
    return this.userRepository.delete(Number(id));
  }

  saveUser(user: User) {
    return this.userRepository.save(user);
  }
}
