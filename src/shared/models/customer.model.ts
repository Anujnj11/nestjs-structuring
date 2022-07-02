import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Address {
  @Prop({ minlength: 6 })
  pinCode: string;

  @Prop({ minlength: 6 })
  lane: string;
}

@Schema({ timestamps: true })
export class Customer extends Document {
  @Prop({ required: true, trim: true })
  firstName: string;

  @Prop({ required: true, trim: true })
  lastName: string;

  @Prop({ required: false, default: [] })
  address: Address[];

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
