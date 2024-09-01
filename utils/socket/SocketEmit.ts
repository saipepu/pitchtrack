import socket from '@/utils/socket';

export const EmitSocket = (path: string, payload?: any) => {
  socket.emit(path, payload);
}