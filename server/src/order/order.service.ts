import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order';
import { OrderToProduct } from 'src/entities/order-to-product';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderToProduct)
    private orderToProductRepository: Repository<OrderToProduct>,
    private userService: UserService,
    private productService: ProductService,
  ) {}

  findAll() {
    return this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderToProduct', 'orderToProduct')
      .leftJoinAndSelect('orderToProduct.product', 'product')
      .select(['order', 'product.id', 'orderToProduct.amount', 'user'])
      .getMany();
  }

  findByUserId(userId: string) {
    return this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderToProduct', 'orderToProduct')
      .leftJoinAndSelect('orderToProduct.product', 'product')
      .where('user.id = :id', { id: userId })
      .select(['order', 'product.id', 'orderToProduct.amount'])
      .getMany();
  }

  updateOrder(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.update(id, { status: updateOrderDto.status });
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    const user = await this.userService.findById(String(createOrderDto.userId));
    const currentOrder = this.orderRepository.create();
    currentOrder.user = user;
    for (const { productId, amount } of createOrderDto.products) {
      const product = await this.productService.getProductById(productId);
      const orderToProduct = this.orderToProductRepository.create();
      orderToProduct.product = product;
      orderToProduct.amount = amount;
      if (currentOrder.orderToProduct) {
        currentOrder.orderToProduct.push(orderToProduct);
      } else {
        currentOrder.orderToProduct = [orderToProduct];
      }
    }

    currentOrder.address = createOrderDto.address;
    currentOrder.comment = createOrderDto.comment;
    currentOrder.entrance = createOrderDto.entrance;
    currentOrder.flat = createOrderDto.flat;
    currentOrder.intercom = createOrderDto.intercom;
    currentOrder.phone = createOrderDto.phone;
    currentOrder.status = 'InProgress';
    return this.orderRepository.save(currentOrder);
  }
}
