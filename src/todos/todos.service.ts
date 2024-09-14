import { Injectable } from '@nestjs/common';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoInput: CreateTodoInput) {
    return this.prisma.todo.create({
      data: {
        name: createTodoInput.name,
      },
    });
  }

  async findAll() {
    return this.prisma.todo.findMany();
  }

  async findOne(id: number) {
    return this.prisma.todo.findUnique({
      where: { id: id },
    });
  }

  async update(id: number, updateTodoInput: UpdateTodoInput) {
    return this.prisma.todo.update({
      where: { id: id },
      data: {
        name: updateTodoInput.name,
      },
    });
  }

  async toggle(id: number) {
    const todo = await this.prisma.todo.findUnique({
      where: { id: id },
    });

    return this.prisma.todo.update({
      where: { id: id },
      data: {
        completed: !todo.completed,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.todo.delete({
      where: { id: id },
    });
  }
}
