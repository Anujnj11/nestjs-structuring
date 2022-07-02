import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true, ref: 'Customer' })
  customerId: Types.ObjectId;

  @Prop({ required: true })
  variantId: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
