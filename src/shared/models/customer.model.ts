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
  @Prop({ required: true, trim: true, index: true, unique: true })
  emailId: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true, trim: true })
  firstName: string;

  @Prop({ required: true, trim: true })
  lastName: string;

  @Prop({ required: false, default: [] })
  address: Address[];

  @Prop({ type: Boolean, default: true, select: false })
  isActive: boolean;
}

export let CustomerSchema = SchemaFactory.createForClass(Customer);
