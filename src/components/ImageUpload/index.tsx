import React, { useState, ChangeEvent } from 'react';
import { toast } from 'sonner';

interface ImageUploadProps {
  onImageUpload: (file: File) => Promise<string>;
  initialImage?: string;
  maxSize?: number; // 以MB为单位
  accept?: string;
  className?: string;
}

/**
 * 图片上传组件
 * 支持预览、上传和删除图片
 */
const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  initialImage = '',
  maxSize = 5, // 默认最大5MB
  accept = 'image/jpeg,image/png,image/gif',
  className = '',
}) => {
  const [imageUrl, setImageUrl] = useState<string>(initialImage);
  const [loading, setLoading] = useState<boolean>(false);
  const maxSizeBytes = maxSize * 1024 * 1024; // 转换为字节
  
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // 检查文件类型
    if (!file.type.match(/(jpeg|jpg|png|gif)/i)) {
      toast.error('请上传有效的图片文件');
      return;
    }
    
    // 检查文件大小
    if (file.size > maxSizeBytes) {
      toast.error(`图片大小不能超过${maxSize}MB`);
      return;
    }
    
    setLoading(true);
    try {
      // 调用上传函数
      const url = await onImageUpload(file);
      setImageUrl(url);
      toast.success('图片上传成功');
    } catch (error) {
      console.error('上传图片失败:', error);
      toast.error('图片上传失败，请重试');
    } finally {
      setLoading(false);
      
      // 重置文件输入，以便可以再次选择同一文件
      e.target.value = '';
    }
  };
  
  const handleRemoveImage = () => {
    setImageUrl('');
  };
  
  return (
    <div className={`relative ${className}`}>
      {imageUrl ? (
        <div className="relative">
          <img 
            src={imageUrl} 
            alt="Uploaded" 
            className="object-cover rounded-md w-full h-full"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
            title="删除图片"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100">
          {loading ? (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="animate-spin h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="mt-2 text-sm text-gray-500">
                正在上传...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">点击上传图片</span> 或拖放
              </p>
              <p className="text-xs text-gray-500">
                支持 JPG, PNG, GIF (最大 {maxSize}MB)
              </p>
            </div>
          )}
          <input 
            id="dropzone-file" 
            type="file" 
            className="hidden" 
            accept={accept}
            onChange={handleImageChange}
            disabled={loading}
          />
        </label>
      )}
    </div>
  );
};

export default ImageUpload;
