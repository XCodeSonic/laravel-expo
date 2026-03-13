<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function fetchProductById($id)
    {
        $product = Product::where('id', $id)->first();

        return response()->json($product);
    }

    public function fetchProduct()
    {
        $products = Product::latest()->get();

        return response()->json($products);
    }

    public function create(Request $request)
    {
        $request->validate([
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png'],
            'name' => ['required', 'string'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric']
        ]);

        $image_url = $request->file('image')->store('products', 'public');

        Product::create([
            'image' => $image_url,
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price
        ]);

        return response()->json([
            'message' => 'Product added successfully'
        ]);
    }

    public function update(Request $request, $id)
    {
        $product = Product::where('id', $id)->first();

        if (!$product) {
            return response()->json([
                'message' => 'Product not found'
            ]);
        }

         $request->validate([
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png'],
            'name' => ['required', 'string'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric']
        ]);

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($product->image);

             $image_url = $request->file('image')->store('products', 'public');

             $product->update([
                'image' => $image_url
             ]);
        }

        $product->update([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price
        ]);

        return response()->json([
            'message' => 'Product updated successfully'
        ]);
    }

    public function delete($id)
    {
        Product::where('id', $id)->delete();
    }
}
