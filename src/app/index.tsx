import { ScrollView, Text, View } from "react-native";
import "../global.css";

export default function App() {
  return (
    <ScrollView className="flex-1 bg-neutral-6 px-6 py-12">
      <View className="mb-8">
        <Text className="text-title-1 text-primary-1 text-center mb-2">
          Design System Demo
        </Text>
        <Text className="text-body-2 text-neutral-3 text-center">
          Rendered using styles extracted from Figma via figma-mcp-go
        </Text>
      </View>

      {/* Typography Showcase */}
      <View className="mb-8 bg-neutral-6 p-6 rounded-2xl shadow-card-1 border border-neutral-5">
        <Text className="text-title-3 text-neutral-1 mb-4 border-b border-neutral-4 pb-2">
          Typography Showcase
        </Text>
        
        <View className="space-y-4">
          <View>
            <Text className="text-caption-2 text-neutral-2">Title 1 (Poppins SemiBold 24px/28px)</Text>
            <Text className="text-title-1 text-neutral-1">Heading Title 1</Text>
          </View>
          
          <View className="mt-3">
            <Text className="text-caption-2 text-neutral-2">Title 2 (Poppins SemiBold 20px/28px)</Text>
            <Text className="text-title-2 text-neutral-1">Section Title 2</Text>
          </View>

          <View className="mt-3">
            <Text className="text-caption-2 text-neutral-2">Title 3 (Poppins SemiBold 16px/24px)</Text>
            <Text className="text-title-3 text-neutral-1">Sub-section Title 3</Text>
          </View>

          <View className="mt-3">
            <Text className="text-caption-2 text-neutral-2">Body 1 (Poppins Medium 16px/24px)</Text>
            <Text className="text-body-1 text-neutral-1">Body Text Medium 1 (Poppins 16px)</Text>
          </View>

          <View className="mt-3">
            <Text className="text-caption-2 text-neutral-2">Body 2 (Poppins Regular 16px/24px)</Text>
            <Text className="text-body-2 text-neutral-1">Body Text Regular 2 (Poppins 16px)</Text>
          </View>

          <View className="mt-3">
            <Text className="text-caption-2 text-neutral-2">Body 3 (Poppins Medium 14px/21px)</Text>
            <Text className="text-body-3 text-neutral-1">Body Text Small Medium 3 (Poppins 14px)</Text>
          </View>

          <View className="mt-3">
            <Text className="text-caption-2 text-neutral-2">Caption 1 (Poppins SemiBold 12px/16px)</Text>
            <Text className="text-caption-1 text-neutral-1">CAPTION SEMIBOLD 1</Text>
          </View>

          <View className="mt-3">
            <Text className="text-caption-2 text-neutral-2">Caption 2 (Poppins Medium 12px/16px)</Text>
            <Text className="text-caption-2 text-neutral-1">Caption Medium 2</Text>
          </View>
        </View>
      </View>

      {/* Colors Showcase */}
      <View className="mb-8 bg-neutral-6 p-6 rounded-2xl shadow-card-1 border border-neutral-5">
        <Text className="text-title-3 text-neutral-1 mb-4 border-b border-neutral-4 pb-2">
          Color Swatches
        </Text>

        {/* Primary Colors */}
        <Text className="text-caption-1 text-neutral-2 mb-2">PRIMARY</Text>
        <View className="flex-row flex-wrap mb-4 gap-2">
          <View className="items-center mr-2">
            <View className="w-16 h-16 rounded-xl bg-primary-1 justify-center items-center shadow-card-1" />
            <Text className="text-caption-2 text-neutral-1 mt-1">Primary 1</Text>
            <Text className="text-caption-2 text-neutral-3">#3629B7</Text>
          </View>
          <View className="items-center mr-2">
            <View className="w-16 h-16 rounded-xl bg-primary-2 justify-center items-center" />
            <Text className="text-caption-2 text-neutral-1 mt-1">Primary 2</Text>
            <Text className="text-caption-2 text-neutral-3">#5655B9</Text>
          </View>
          <View className="items-center mr-2">
            <View className="w-16 h-16 rounded-xl bg-primary-3 justify-center items-center" />
            <Text className="text-caption-2 text-neutral-1 mt-1">Primary 3</Text>
            <Text className="text-caption-2 text-neutral-3">#A8A3D7</Text>
          </View>
          <View className="items-center mr-2">
            <View className="w-16 h-16 rounded-xl bg-primary-4 justify-center items-center border border-neutral-4" />
            <Text className="text-caption-2 text-neutral-1 mt-1">Primary 4</Text>
            <Text className="text-caption-2 text-neutral-3">#F2F1F9</Text>
          </View>
        </View>

        {/* Semantic Colors */}
        <Text className="text-caption-1 text-neutral-2 mb-2">SEMANTIC</Text>
        <View className="flex-row flex-wrap gap-2">
          <View className="items-center mr-2">
            <View className="w-12 h-12 rounded-xl bg-semantic-1" />
            <Text className="text-caption-2 text-neutral-1 mt-1">Error</Text>
            <Text className="text-caption-2 text-neutral-3">#FF4267</Text>
          </View>
          <View className="items-center mr-2">
            <View className="w-12 h-12 rounded-xl bg-semantic-2" />
            <Text className="text-caption-2 text-neutral-1 mt-1">Info</Text>
            <Text className="text-caption-2 text-neutral-3">#0890FE</Text>
          </View>
          <View className="items-center mr-2">
            <View className="w-12 h-12 rounded-xl bg-semantic-3" />
            <Text className="text-caption-2 text-neutral-1 mt-1">Warn</Text>
            <Text className="text-caption-2 text-neutral-3">#FFAF2A</Text>
          </View>
          <View className="items-center mr-2">
            <View className="w-12 h-12 rounded-xl bg-semantic-4" />
            <Text className="text-caption-2 text-neutral-1 mt-1">Success</Text>
            <Text className="text-caption-2 text-neutral-3">#52D5BA</Text>
          </View>
          <View className="items-center mr-2">
            <View className="w-12 h-12 rounded-xl bg-semantic-5" />
            <Text className="text-caption-2 text-neutral-1 mt-1">Alert</Text>
            <Text className="text-caption-2 text-neutral-3">#FB6B18</Text>
          </View>
        </View>
      </View>

      {/* Effects Showcase */}
      <View className="mb-16">
        <Text className="text-title-3 text-neutral-1 mb-4">
          Shadow Effects
        </Text>
        
        <View className="bg-neutral-6 p-5 rounded-2xl shadow-card-1 border border-neutral-5 mb-4">
          <Text className="text-title-3 text-primary-1 font-bold">Standard Card (shadow-card-1)</Text>
          <Text className="text-body-2 text-neutral-3 mt-1">
            Drop Shadow with 7% opacity on Primary 1 color. Offset Y: 4. Blur: 30.
          </Text>
        </View>

        <View className="bg-neutral-6 p-5 rounded-2xl shadow-card-2 border border-neutral-5">
          <Text className="text-title-3 text-neutral-1 font-bold">Secondary Card (shadow-card-2)</Text>
          <Text className="text-body-2 text-neutral-3 mt-1">
            Drop Shadow with 5% opacity on black. Offset Y: 5. Blur: 30.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
