import { Filter, useQuery, useSave, useRemove, useUpdate } from 'offix-datastore';
import { TaskModel, CommentModel } from './config';
import { Task, Comment } from './generated';

// This will be generated in near future

export const useFindTasks = (filter?: string | Filter<Task> | undefined) => useQuery(TaskModel, filter);

export const useAddTask = () => useSave(TaskModel);

export const useEditTask = () => useUpdate<Task>(TaskModel);

export const useDeleteTask = () => useRemove<Task>(TaskModel);

export const useFindComments = (filter?: string | Filter<Comment> | undefined) => useQuery(CommentModel, filter);

export const useAddComment = () => useSave(CommentModel);

export const useEditComment = () => useUpdate<Comment>(CommentModel);

export const useDeleteComment = () => useRemove<Comment>(CommentModel);


