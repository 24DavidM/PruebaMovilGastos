import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useGastos } from '@/context/GastosContext';
import { Trash2 } from 'lucide-react-native';

type EliminarGastoModalProps = {
  gastoId: string | null;
  descripcion: string;
  monto: number;
  isVisible: boolean;
  onClose: () => void;
};

export default function EliminarGastoModal({
  gastoId,
  descripcion,
  monto,
  isVisible,
  onClose,
}: EliminarGastoModalProps) {
  const { eliminarGasto } = useGastos();

  const handleEliminar = async () => {
    if (!gastoId) return;
    
    try {
      await eliminarGasto(gastoId);
      Alert.alert('Éxito', 'Gasto eliminado correctamente');
      onClose();
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar el gasto');
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-3xl p-6 w-[90%] max-w-sm">
          <View className="items-center mb-4">
            <View className="bg-red-100 w-16 h-16 rounded-full items-center justify-center mb-4">
              <Trash2 size={32} color="#dc2626" />
            </View>
            <Text className="text-xl font-bold text-gray-900 mb-2">
              ¿Eliminar gasto?
            </Text>
            <Text className="text-gray-500 text-center mb-2">
              {descripcion}
            </Text>
            <Text className="text-2xl font-bold text-red-600">
              ${monto.toFixed(2)}
            </Text>
          </View>

          <Text className="text-gray-600 text-center mb-6">
            Esta acción no se puede deshacer
          </Text>

          <View className="flex-row space-x-3">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 bg-gray-100 py-3 rounded-xl"
            >
              <Text className="text-gray-700 text-center font-semibold">
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleEliminar}
              className="flex-1 bg-red-600 py-3 rounded-xl"
            >
              <Text className="text-white text-center font-semibold">
                Eliminar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}