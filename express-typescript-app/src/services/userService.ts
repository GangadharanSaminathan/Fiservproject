import { User } from '@/types';
import { logger } from '@/config/logger';
import { AppError } from '@/middleware/errorHandler';

class UserService {
  private users: User[] = [
    {
      id: '1',
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      email: 'jane@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findAll(): Promise<User[]> {
    logger.info('Fetching all users from service');
    return this.users;
  }

  async findById(id: string): Promise<User> {
    logger.info('Fetching user by ID from service', { userId: id });
    
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    logger.info('Fetching user by email from service', { email });
    
    const user = this.users.find(u => u.email === email);
    return user || null;
  }

  async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    logger.info('Creating new user in service', { email: userData.email });
    
    // Check if user already exists
    const existingUser = await this.findByEmail(userData.email);
    if (existingUser) {
      throw new AppError('User with this email already exists', 409);
    }

    const newUser: User = {
      id: (this.users.length + 1).toString(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);
    logger.info('User created successfully in service', { userId: newUser.id });
    
    return newUser;
  }

  async update(id: string, userData: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User> {
    logger.info('Updating user in service', { userId: id });
    
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new AppError('User not found', 404);
    }

    const updatedUser = {
      ...this.users[userIndex],
      ...userData,
      updatedAt: new Date(),
    };

    this.users[userIndex] = updatedUser;
    logger.info('User updated successfully in service', { userId: id });
    
    return updatedUser;
  }

  async delete(id: string): Promise<User> {
    logger.info('Deleting user in service', { userId: id });
    
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new AppError('User not found', 404);
    }

    const deletedUser = this.users.splice(userIndex, 1)[0];
    logger.info('User deleted successfully in service', { userId: id });
    
    return deletedUser;
  }

  async count(): Promise<number> {
    return this.users.length;
  }
}

export const userService = new UserService();