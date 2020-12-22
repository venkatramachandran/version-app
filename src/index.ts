import 'reflect-metadata';
import {container} from 'tsyringe';
import VersionApp from './app';

container.resolve(VersionApp).start();
