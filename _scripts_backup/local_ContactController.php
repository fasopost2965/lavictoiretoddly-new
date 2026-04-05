<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    protected array $subjectLabels = [
        'matchs-amicaux' => 'Organisation de matchs amicaux',
        'journees-fifa'  => 'Journées FIFA',
        'camp-entrainement' => "Camp d'entraînement",
        'logistique'     => 'Logistique & accompagnement',
        'negociation'    => 'Négociation contractuelle',
        'evenement'      => 'Événement sportif',
        'marketing'      => 'Marketing sportif',
        'autre'          => 'Autre demande',
    ];

    public function send(Request $request)
    {
        // Enlève le minimum de 5 caractères, seul required est maintenu.
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:100',
            'last_name'  => 'required|string|max:100',
            'email'      => 'required|email|max:255',
            'phone'      => 'nullable|string|max:30',
            'subject'    => 'required|string',
            'message'    => 'required|string|max:3000',
        ]);

        if ($validator->fails()) {
            return back()
                ->withErrors($validator)
                ->withInput()
                ->with('scroll_to_contact', true);
        }

        $subjectLabel = $this->subjectLabels[$request->subject] ?? $request->subject;

        $formData = [
            'first_name'    => $request->first_name,
            'last_name'     => $request->last_name,
            'email'         => $request->email,
            'phone'         => $request->phone ?? '',
            'subject'       => $request->subject,
            'subject_label' => $subjectLabel,
            'message'       => $request->message,
            'submitted_at'  => now()->setTimezone('America/Toronto')->format('d/m/Y à H:i'),
        ];

        try {
            Mail::to('fsore701@outlook.com')
                ->send(new ContactFormMail($formData));

            return back()
                ->with('contact_success', true)
                ->with('scroll_to_contact', true);
        } catch (\Exception $e) {
            Log::error('Erreur d\'envoi mail contact: ' . $e->getMessage());

            return back()
                ->with('contact_error', true)
                ->with('scroll_to_contact', true)
                ->withInput();
        }
    }
}
